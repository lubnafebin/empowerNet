import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import {
  createMemberApi,
  deleteMemberApi,
  getMemberDetailsApi,
  getMemberListApi,
  updateMemberApi,
} from "../apis";
import { enqueueSnackbar } from "notistack";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { AlertRowAction, useAlertContext } from "../../../shared";
import {
  getDistrictsByStateIdApi,
  getRolesApi,
  utilFunctions,
} from "../../../utils";
import { BASE_URL } from "../../../configs";

const initialFormState = {
  isFormLoading: true,
  isFormSubmitting: false,
  memberList: { options: [], loading: true },
  district: { options: [], loading: true },
  selectedMemberId: null,
  formData: {
    name: "",
    email: "",
    aadharNo: "",
    contactNo: "",
    addressLine2: "",
    addressLine1: "",
    districtId: null,
    postcode: "",
    profile: null,
    aadharAttachment: null,
    signatureAttachment: null,
  },
};

export const useMemberList = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    memberList: { options: [], loading: true },
    district: { options: [], loading: true },
    role: { options: [], loading: true },
    selectedMemberId: null,
    formData: {
      name: "",
      email: "",
      aadharNo: "",
      contactNo: "",
      addressLine2: "",
      addressLine1: "",
      districtId: null,
      roleId: null,
      postcode: "",
      profile: null,
      aadharAttachment: null,
      signatureAttachment: null,
    },
  });
  const { setAlert } = useAlertContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { nhgId } = useParams();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const getDistrictsList = async () => {
    triggerTableLoading(true);
    try {
      const response = await getDistrictsByStateIdApi({});
      const { success, message, data } = response;

      if (success) {
        setState((draft) => {
          draft.district.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const getRoleList = async () => {
    triggerTableLoading(true);
    try {
      const response = await getRolesApi();
      const { success, message, data } = response;

      if (success) {
        setState((draft) => {
          draft.role.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const getMemberDetails = async (memberId) => {
    triggerFormLoading(true);
    try {
      const response = await getMemberDetailsApi(memberId);

      const { success, message, data } = response;

      if (success) {
        setState((draft) => {
          if (data.user.profile?.url) {
            draft.formData.profile = BASE_URL + data.user.profile.url;
          }
          draft.formData.aadharAttachment = {
            name: data.attachments[0].url.split("/")[1],
            url: BASE_URL + data.attachments[0].url,
          };
          draft.formData.signatureAttachment = {
            name: data.attachments[1].url.split("/")[1],
            url: BASE_URL + data.attachments[1].url,
          };
          draft.formData.name = data.user.name;
          draft.formData.email = data.user.email;
          draft.formData.roleId = data.user.role;
          draft.formData.contactNo = data.address.contactNo;
          draft.formData.aadharNo = data.address.aadharNo;
          draft.formData.addressLine1 = data.address.addressLine1;
          draft.formData.addressLine2 = data.address.addressLine2;
          draft.formData.districtId = data.address.district;
          draft.formData.postcode = data.address.postcode;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerFormLoading(false);
    }
  };

  const getMemberList = async (nhgId) => {
    triggerTableLoading(true);
    try {
      const response = await getMemberListApi(nhgId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.memberList.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const createNewMember = async (formData) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await createMemberApi(formData);

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMemberList(nhgId);
        handleResetFormData();
        navigate(location.pathname, { replace: true, state: location.state });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerSubmitButtonLoading(false);
    }
  };

  const updateMember = async ({ formData, memberId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await updateMemberApi({ params: formData, memberId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMemberList(nhgId);
        handleResetFormData();
        navigate(location.pathname, { replace: true, state: location.state });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerSubmitButtonLoading(false);
    }
  };

  const deleteMember = async (wardId) => {
    triggerTableLoading(true);
    try {
      const response = await deleteMemberApi({ wardId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getMemberList(nhgId);
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerTableLoading(false);
    }
  };

  const triggerFormLoading = (status) => {
    setState((draft) => {
      draft.isFormLoading = status;
    });
  };

  const triggerSubmitButtonLoading = (status) => {
    setState((draft) => {
      draft.isFormSubmitting = status;
    });
  };

  const triggerTableLoading = (status) => {
    setState((draft) => {
      draft.memberList.loading = status;
    });
  };

  const handleResetFormData = () => {
    setState((draft) => {
      draft.formData = initialFormState.formData;
      draft.selectedMemberId = initialFormState.selectedMemberId;
    });
  };

  const toggleModel = async ({ type, id }) => {
    switch (type) {
      case "memberDetails":
        handleMemberSelection(id);
        break;
      case "deleteMember":
        setAlert((draft) => {
          draft.open = true;
          draft.dialogValue = "?delete";
          draft.title = "Delete Member";
          draft.description =
            "Are you sure? Do you want to delete the member. Once you delete the member there is no going back.";
          draft.rowAction = (
            <AlertRowAction
              onClick={async () => await deleteMember(id)}
              label="Delete"
            />
          );
        });
        break;
      default:
        navigate("?new-member", { state: location.state });
        break;
    }
  };

  const handleMemberSelection = async (id) => {
    navigate("?member", { state: location.state });
    setState((draft) => {
      draft.selectedMemberId = id;
    });
    await getMemberDetails(id);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      if (
        ["signatureAttachment", "aadharAttachment", "profile"].includes(name)
      ) {
        draft.formData[name] = value?.target?.files
          ? value.target.files[0]
          : value;
      } else {
        draft.formData[name] = value;
      }
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      const formData = new FormData();

      Object.entries(state.formData).forEach(([key, value]) => {
        const newValue = ["districtId", "roleId"].includes(key)
          ? value.id
          : value;

        if (
          ["signatureAttachment", "aadharAttachment", "profile"].includes(key)
        ) {
          value instanceof File && formData.append(key, newValue);
        } else {
          formData.append(key, newValue);
        }
      });

      switch (location.search) {
        case "?new-member":
          await createNewMember(formData);
          break;
        case "?member":
          await updateMember({
            formData,
            memberId: state.selectedMemberId,
          });
          break;
        default:
          break;
      }
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  // Reset form data
  React.useEffect(() => {
    if (
      (location.search === "" && state.formData.name) ||
      formValidator.current.errorMessages
    ) {
      // formValidator.current.hideMessages();
      // setState(initialFormState);
      // setForceUpdate(0);
    }
  }, [location.search]);

  React.useEffect(() => {
    getMemberList(nhgId);
    getDistrictsList();
    getRoleList();
  }, []);

  return {
    state,
    formValidator,
    handleFormSubmit,
    toggleModel,
    handleFormChange,
    handleResetFormData,
  };
};
