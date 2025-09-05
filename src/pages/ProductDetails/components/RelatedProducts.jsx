export default function RelatedProducts({ products }) {
  if (!products.length) return null;
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">محصولات پیشنهادی</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {products.map((rp) => (
          <div
            key={rp.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
          >
            <img src={rp.img} alt={rp.productTitle} className="w-32 h-32 object-contain" />
            <h3 className="mt-2 text-sm text-gray-700">{rp.productTitle}</h3>
            <span className="text-amber-600 font-bold">
              {rp.price.toLocaleString("en-US")} تومان
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
