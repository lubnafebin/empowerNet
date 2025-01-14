import { useImmer } from "use-immer";
import { createMember, getNhgMembers, updateMember } from "../api/nhgApi";
import { getDistrict } from "../../../utils/services";
import React, { useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useLocation, useNavigate } from "react-router-dom";

export const useMembersListContainer = () => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    districts: [],
    members: [],
    formData: {
      name: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      districtId: "",
      postcode: "",
      contactNo: "",
      aadharNo: "",
      profile: null,
      signatureAttachment: null,
      aadharAttachment: null,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => {
        message;
      },
    }),
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setState((draft) => {
      draft.formData[name] = files[0]; // Save the file object in state
    });
  };

  const fetchDistricts = async () => {
    try {
      const response = await getDistrict();
      const { success, message, data } = response.data;
      if (success) {
        setState((draft) => {
          draft.districts = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await getNhgMembers();
      const { success, message, data } = response.data;
      if (success) {
        setState((draft) => {
          draft.members = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const createMemberHandler = async () => {
    console.log(state.formData);
    const formData = new FormData();

    // Loop through formData and append all values
    Object.entries(state.formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value); // Append file objects as they are
      } else if (value) {
        formData.append(key, value); // Append other fields as regular values
      }
    });

    try {
      const response = await createMember(formData);
      const { success, message } = response.data;
      if (success) {
        navigate(location.pathname, { replace: true });
        await fetchMembers();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  const updateMemberHandler = async (memberId, memberData) => {
    const formData = new FormData();
    Object.entries(state.formData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await updateMember(memberId, memberData);
      const { success, message } = response.data;
      if (success) {
        navigate(location.pathname, { replace: true });
        await fetchMembers();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (formValidator.current.allValid()) {
      await createMemberHandler(state.formData);
    } else {
      formValidator.current.showMessages();
      setForceUpdate((prev) => prev + 1);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      const memberId = state.selectedMemberId;
      if (!memberId) {
        console.error("Member ID is undefined.");
        return;
      }
      await updateMemberHandler(memberId, state.formData);
    } else {
      formValidator.current.showMessages();
      setForceUpdate((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    state,
    setState,
    handleInputChange,
    handleFileChange,
    handleCreate,
    handleUpdate,
    formValidator,
  };
};
