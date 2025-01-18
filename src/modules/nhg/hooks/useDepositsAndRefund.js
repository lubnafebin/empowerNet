import React, { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { getNhgMembers, getAllTransactions } from "../api/nhgApi";

export const useDepositsAndRefund = () => {
  const [, setForceUpdate] = React.useState(0);
  const [state, setState] = useImmer({
    accountHolders: [],
    formData: {
      deposit: "",
      refund: "",
      memberFee: "",
      accountHolders: "",
    },
  });

  const formValidator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: setForceUpdate },
      element: (message) => {
        message;
      },
    }),
  );

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    setState((draft) => {
      draft.formData[name] = value;
    });
  };

  const getParticipants = async () => {
    try {
      const response = await getNhgMembers();
      const { success, data } = response.data;
      if (success) {
        const participants = data.map((member) => ({
          id: member.user.id,
          name: member.user.name,
        }));
        setState((draft) => {
          draft.accountHolders = participants;
        });
      } else {
        throw new Error("Failed to fetch participants");
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions();
      const { success, message, data } = response.data;
      if (success) {
        setState((draft) => {
          draft.transactions = data;
        });
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleCreate = (data) => {
    // logic to handle create
    setState(data);
  };

  useEffect(() => {
    getParticipants();
    fetchTransactions();
  }, []);

  return { state, handleCreate, handleFormChange, formValidator };
};
