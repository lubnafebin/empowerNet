import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import {
  assignWardAdsApi,
  deleteWardApi,
  getNhgPresidentsByWardIdApi,
  getWardDetailsApi,
  getWardNhgListApi,
} from "../apis";
import { enqueueSnackbar } from "notistack";
import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { AlertRowAction, useAlertContext } from "../../../shared";
import { utilFunctions } from "../../../utils";
import { BASE_URL } from "../../../configs";
import { getMemberDetailsApi } from "../../members/apis";

const initialUserDetails = {
  name: "",
  email: "",
  aadharNo: "",
  contactNo: "",
  role: "",
  addressLine2: "",
  addressLine1: "",
  district: "",
  postcode: "",
  profile: "",
  aadharAttachment: null,
  signatureAttachment: null,
};

export const useNhgList = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    isFormLoading: true,
    isFormSubmitting: false,
    isTableLoading: true,
    NhgList: { options: [] },
    president: { options: [] },
    selectedWardId: null,
    wardDetails: {
      name: "",
      wardNo: "",
    },
    useDetails: {
      name: "",
      email: "",
      aadharNo: "",
      contactNo: "",
      role: "",
      addressLine2: "",
      addressLine1: "",
      district: "",
      postcode: "",
      profile: "",
      aadharAttachment: null,
      signatureAttachment: null,
    },
    formData: { ads: null },
  });
  const { wardId } = useParams();
  const { setAlert } = useAlertContext();
  const location = useLocation();
  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => message,
    }),
  );

  const getMemberDetails = async (memberId) => {
    triggerFormLoading(true);
    try {
      const response = await getMemberDetailsApi(memberId);

      const { success, message, data } = response;

      if (success) {
        setState((draft) => {
          if (data.user.profile?.url) {
            draft.useDetails.profile = BASE_URL + data.user.profile.url;
          }
          draft.useDetails.aadharAttachment = {
            name: data.attachments[0].url.split("/")[1],
            url: BASE_URL + data.attachments[0].url,
          };
          draft.useDetails.signatureAttachment = {
            name: data.attachments[1].url.split("/")[1],
            url: BASE_URL + data.attachments[1].url,
          };
          draft.useDetails.name = data.user.name;
          draft.useDetails.email = data.user.email;
          draft.useDetails.role = data.user.role.name;
          draft.useDetails.contactNo = data.address.contactNo;
          draft.useDetails.aadharNo = data.address.aadharNo;
          draft.useDetails.addressLine1 = data.address.addressLine1;
          draft.useDetails.addressLine2 = data.address.addressLine2;
          draft.useDetails.district = data.address.district.name;
          draft.useDetails.postcode = data.address.postcode;
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

  const getNhgPresidentsByWardId = async (wardId) => {
    // triggerTableLoading(true);
    try {
      const response = await getNhgPresidentsByWardIdApi(wardId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.president.options = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      // triggerTableLoading(false);
    }
  };

  const getWardDetails = async (wardId) => {
    triggerFormLoading(true);
    try {
      const response = await getWardDetailsApi(wardId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.wardDetails = data;
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

  const getWardNhgList = async (wardId) => {
    triggerTableLoading(true);
    try {
      const response = await getWardNhgListApi(wardId);

      const { success, message, data } = response;
      if (success) {
        setState((draft) => {
          draft.NhgList.options = data;
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

  const assignWardAds = async ({ adsId, userId, wardId }) => {
    triggerSubmitButtonLoading(true);
    try {
      const response = await assignWardAdsApi({
        wardId,
        params: { adsId, userId },
      });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getWardDetails(wardId);
        navigate(location.pathname, { replace: true });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (exception) {
      utilFunctions.displayError(exception);
    } finally {
      triggerSubmitButtonLoading(false);
    }
  };

  const deleteWard = async (wardId) => {
    triggerTableLoading(true);
    try {
      const response = await deleteWardApi({ wardId });

      const { success, message } = response;
      if (success) {
        enqueueSnackbar({ message, variant: "success" });
        getWardNhgList();
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
      draft.isTableLoading = status;
    });
  };

  const toggleModel = async ({ type, id }) => {
    switch (type) {
      case "wardDetails":
        handleWardSelection(id);
        break;
      case "manageAds": {
        navigate("?manage-ads");
        await getNhgPresidentsByWardId(wardId);
        state.wardDetails.ads &&
          (await getMemberDetails(state.wardDetails.ads?.id));
        break;
      }
      case "deleteWard":
        setAlert((draft) => {
          draft.open = true;
          draft.dialogValue = "?delete";
          draft.title = "Delete Ward";
          draft.description =
            "Are you sure? Do you want to delete the ward. Once you delete the ward there is no going back.";
          draft.rowAction = (
            <AlertRowAction
              onClick={async () => await deleteWard(id)}
              label="Delete"
            />
          );
        });
        break;
      default:
        navigate("?new-ward");
        break;
    }
  };

  const handleFormResting = () => {
    setState((draft) => {
      draft.formData.ads = null;
      draft.useDetails = initialUserDetails;
    });
  };

  const handleWardSelection = async (id) => {
    navigate("?ward");
    setState((draft) => {
      draft.selectedWardId = id;
    });
    await getWardDetails(id);
  };

  const handleFormChange = async (event) => {
    const { name, value } = event.target;
    setState((draft) => {
      draft.formData[name] = value;
    });

    if (value) {
      await getMemberDetails(value.id);
    } else {
      handleFormResting();
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      await assignWardAds({
        wardId,
        adsId: state.formData.ads.id,
        userId: state.formData.ads.userId,
      });
    } else {
      formValidator.current.showMessages();
      setForceUpdate(1);
    }
  };

  React.useEffect(() => {
    getWardNhgList(wardId);
    getWardDetails(wardId);
  }, []);

  return {
    state,
    formValidator,
    handleFormSubmit,
    toggleModel,
    handleFormChange,
    handleFormResting,
  };
};
