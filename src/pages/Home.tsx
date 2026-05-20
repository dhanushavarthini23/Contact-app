import { useState, useEffect } from "react";
import ContactCard from "../components/ContactCard";
import ContactModal from "../features/contacts/ContactModal";
import type { Contact } from "../features/contacts/types";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [editingContact, setEditingContact] =
  useState<Contact | null>(null);
  const[error,setError]=useState("");

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts =
      localStorage.getItem("contacts");

    return savedContacts
      ? JSON.parse(savedContacts)
      : [];
  });

  const addContact = (
    name: string,
    phone: string
  ) => {
    const alreadyExists=contacts.some(
      (contacts)=>contacts.phone===phone
    );
    if(alreadyExists){
      setError("Contact Already Exits");
      setTimeout(()=>{
        setError("");
      },3000);
      return;
    }
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
      favorite: false,
    };

    setContacts((prev) => [
      ...prev,
      newContact,
    ]);
  };

  const toggleFavorite = (id: number) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              favorite: !contact.favorite,
            }
          : contact
      )
    );
  };

  const deleteContact = (id: number) => {
    setContacts((prev) =>
      prev.filter(
        (contact) => contact.id !== id
      )
    );
  };
  const editContact = (id: number) => {
    const contact = contacts.find(
      (c) => c.id === id
    );
  
    if (contact) {
      setEditingContact(contact);
      setOpen(true);
    }
  };

  const updateContact = (
    id: number,
    name: string,
    phone: string
  ) => {
    const alreadyExists = contacts.some(
      (contact) =>
        contact.phone === phone &&
        contact.id !== id
    );
  
    if (alreadyExists) {
      alert("Phone number already exists!");
      return;
    }
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              name,
              phone,
            }
          : contact
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "contacts",
      JSON.stringify(contacts)
    );
  }, [contacts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black-100 p-6">
      {error && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-pulse">
    {error}
  </div>
)}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            Contact App
          </h1>

          <p className="text-slate-300 mt-1">
            Manage your contacts easily
          </p>
        </div>

        <button
  onClick={() => {
    setEditingContact(null);
    setOpen(true);
  }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition duration-300"  
        >
          + Add Contact
        </button>
      </div>

      <ContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAddContact={addContact}
        editingContact={editingContact}
        onUpdateContact={updateContact}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Contacts
          </h2>

          {contacts.length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              No contacts added yet.
            </p>
          ) : (
            contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                id={contact.id}
                name={contact.name}
                phone={contact.phone}
                favorite={contact.favorite}
                onToggleFavorite={
                  toggleFavorite
                }
                onDelete={deleteContact}
                onEdit={editContact}
              />
            ))
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Favorites
          </h2>

          {contacts.filter(
            (contact) => contact.favorite
          ).length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              No favorite contacts yet.
            </p>
          ) : (
            contacts
              .filter(
                (contact) => contact.favorite
              )
              .map((contact) => (
                <ContactCard
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  phone={contact.phone}
                  favorite={contact.favorite}
                  onToggleFavorite={
                    toggleFavorite
                  }
                  onDelete={deleteContact}
                  onEdit={editContact}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}