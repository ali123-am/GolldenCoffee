import { useState } from "react";

export default function ReviewModal({ isOpen, onClose, onAdd }) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">ثبت دیدگاه جدید</h3>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نظر خود را وارد کنید..."
          className="w-full border rounded-lg p-2 mb-4 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
        />

        <div className="mb-4">
          <label className="block text-sm mb-1">امتیاز:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-lg p-2 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {"⭐".repeat(r)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border dark:border-zinc-600"
          >
            لغو
          </button>
          <button
            onClick={() => {
              if (!newComment.trim()) return;
              const c = {
                id: Date.now(),
                text: newComment.trim(),
                rating,
                date: new Date().toLocaleString("fa-IR"),
              };
              onAdd(c);
              setNewComment("");
              setRating(5);
              onClose();
            }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
          >
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
}
