type Props = {
    id:number;
    name: string;
    phone: string;
    favorite,
    onToggleFavorite,
    onDelete: (id: number) => void;
    onEdit:(id: number) => void;
  };
  
  export default function ContactCard({
    id,
    name,
    phone,
    favorite,
    onToggleFavorite,
    onDelete,
    onEdit,
  }: Props) {
    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5 mb-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      <div className="flex items-center justify-between">
        
        <div>
          <h2 className="text-xl font-bold text-black">
            {name}
          </h2>
    
          <p className="text-slate-600 mt-1">
            {phone}
          </p>
        </div>
    
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleFavorite(id)}
            className="text-3xl hover:scale-125 transition"
          >
            {favorite ? "❤️" : "🤍"}
          </button>
    
          <button
            onClick={() => onEdit(id)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl transition"
          >
            Edit
          </button>
    
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            Delete
          </button>
        </div>
    
      </div>
    </div>
    );
  }