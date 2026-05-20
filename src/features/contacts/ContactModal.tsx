import { useEffect, useState } from "react";
import type { Contact } from "./types";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (name: string, phone: string) => void;
  editingContact?: Contact | null;
  onUpdateContact: (id: number, name: string, phone: string) => void;
};

export default function ContactModal({
  isOpen,
  onClose,
  onAddContact,
  onUpdateContact,
  editingContact,
}: Props) {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">
          {editingContact ? "Edit Contact" : "Add Contact"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (editingContact) {
                onUpdateContact(editingContact.id, name, phone);
              } else {
                onAddContact(name, phone);
              }

              setName("");
              setPhone("");

              onClose();
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition duration-300"
          >
            {editingContact ? "Update" : "Save"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
