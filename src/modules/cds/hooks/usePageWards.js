import { useImmer } from "use-immer";
import { createWard, updateWard, deleteWard, getWards } from "../api/cdsApis";
import React, { useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useLocation, useNavigate } from "react-router-dom";

export const usePageWards = () => {
  const [_, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    wards: [],
    formData: {
      wardNo: "",
      name: "",
    },
    selectedWardId: null,
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const fetchWards = async () => {
    try {
      const response = await getWards({ limit: 50, page: 1 });
      const { success, message, data } = response.data;
      if (success) {
        setState((draft) => {
          draft.wards = data.rows ?? [];
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const createWardHandler = async (wardData) => {
    try {
      const response = await createWard({ ...wardData });
      const { success, message } = response.data;
      if (success) {
        navigate(location.pathname, { replace: true });
        await fetchWards();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error creating ward:", error);
    }
  };

  const updateWardHandler = async (wardId, wardData) => {
    try {
      const response = await updateWard(wardId, wardData);
      const { success, message } = response.data;
      if (success) {
        navigate(location.pathname, { replace: true });
        await fetchWards();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error updating ward:", error);
    }
  };

  const deleteWardHandler = async (wardId) => {
    try {
      const response = await deleteWard(wardId);
      const { success, message } = response.data;
      if (success) {
        await fetchWards();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error deleting ward:", error);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      await createWardHandler(state.formData);
    } else {
      formValidator.current.showMessages();
      setForceUpdate((prev) => prev + 1);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (formValidator.current.allValid()) {
      const wardId = state.selectedWardId;
      if (!wardId) {
        console.error("Ward ID is undefined.");
        return;
      }
      await updateWardHandler(wardId, state.formData);
    } else {
      formValidator.current.showMessages();
      setForceUpdate((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return {
    deleteWardHandler,
    handleFormChange,
    state,
    setState,
    handleCreate,
    handleUpdate,
    fetchWards,
    formValidator,
  };
};
