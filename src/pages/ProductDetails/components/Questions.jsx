import { useState } from "react";

function AskInline({ onAdd }) {
  const [newQuestion, setNewQuestion] = useState("");
  return (
    <div className="flex gap-2 w-full md:w-2/3">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="سوال خود را وارد کنید..."
        className="flex-1 border rounded-lg p-2 text-gray-700 dark:text-white dark:bg-zinc-800 dark:border-zinc-700"
      />
      <button
        onClick={() => {
          if (!newQuestion.trim()) return;
          const newQ = {
            id: Date.now(),
            question: newQuestion.trim(),
            answer: null,
            date: new Date().toLocaleString("fa-IR"),
          };
          onAdd?.(newQ);
          setNewQuestion("");
        }}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
      >
        ارسال
      </button>
    </div>
  );
}

export default function Questions({ questions, setQuestions }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">پرسش و پاسخ</h2>
        <AskInline onAdd={(q) => setQuestions((s) => [q, ...s])} />
      </div>

      {questions.length > 0 ? (
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="p-3 border rounded-lg bg-gray-50 dark:bg-zinc-700">
              <p className="font-medium">❓ {q.question}</p>
              {q.answer ? (
                <p className="text-green-700 mt-1">💬 {q.answer}</p>
              ) : (
                <p className="text-gray-400 mt-1">در انتظار پاسخ…</p>
              )}
              <span className="text-xs text-gray-500">{q.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">هنوز سوالی ثبت نشده است.</p>
      )}
    </>
  );
}
