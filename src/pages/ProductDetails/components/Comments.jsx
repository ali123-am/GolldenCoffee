import { useState } from "react";
import ReviewModal from "./ReviewModal";

export default function Comments({ comments, onAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">دیدگاه‌ها</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          ثبت دیدگاه جدید
        </button>
      </div>

      {comments.length === 0 ? (
        <p className="text-gray-500">هنوز نظری ثبت نشده است.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="border p-4 rounded-lg dark:border-zinc-700"
            >
              <p className="font-medium">{c.text}</p>
              <p className="text-sm text-gray-500">
                امتیاز: {"⭐".repeat(c.rating)} – {c.date}
              </p>
            </li>
          ))}
        </ul>
      )}

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAdd}
      />
    </div>
  );
}
