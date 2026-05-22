import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "./types";

type ContactsState = {
  contacts: Contact[];
};

const initialState: ContactsState = {
  contacts: JSON.parse(
    localStorage.getItem("contacts") || "[]"
  ),
};

const contactsSlice = createSlice({
  name: "contacts",

  initialState,

  reducers: {
    addContact: (
      state,
      action: PayloadAction<{
        name: string;
        phone: string;
      }>
    ) => {
      state.contacts.push({
        id: Date.now(),
        name: action.payload.name,
        phone: action.payload.phone,
        favorite: false,
      });

      localStorage.setItem(
        "contacts",
        JSON.stringify(state.contacts)
      );
    },

    toggleFavorite: (
      state,
      action: PayloadAction<number>
    ) => {
      const contact = state.contacts.find(
        (c) => c.id === action.payload
      );

      if (contact) {
        contact.favorite =
          !contact.favorite;
      }

      localStorage.setItem(
        "contacts",
        JSON.stringify(state.contacts)
      );
    },

    deleteContact: (
      state,
      action: PayloadAction<number>
    ) => {
      state.contacts =
        state.contacts.filter(
          (c) => c.id !== action.payload
        );

      localStorage.setItem(
        "contacts",
        JSON.stringify(state.contacts)
      );
    },

    updateContact: (
      state,
      action: PayloadAction<Contact>
    ) => {
      state.contacts =
        state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? action.payload
            : contact
        );

      localStorage.setItem(
        "contacts",
        JSON.stringify(state.contacts)
      );
    },
  },
});

export const {
  addContact,
  toggleFavorite,
  deleteContact,
  updateContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;