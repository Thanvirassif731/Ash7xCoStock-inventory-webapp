import React from "react";
import type { Product } from "../../types";

const ProductCard: React.FC<{ product: Product; onEdit?: () => void }> = ({ product, onEdit }) => {
  return (
    <div className="card h-100">
      <img src={product.image_url || "/assets/placeholder.png"} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted small">{product.sku}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <strong>₹{product.price}</strong>
            <div className="small text-muted">Qty: {product.qty}</div>
          </div>
          <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
