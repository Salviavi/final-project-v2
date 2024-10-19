import React, { useState } from 'react';
import axios from 'axios';

export default function TravelPromoForm() {


    const token = localStorage.getItem("access_token");
    
  const [promoData, setPromoData] = useState({
    title: "Pulau 1k 🙏",
    description: "renang gratis",
    imageUrl: "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1729322483122-pulauseribu.jpg",
    terms_condition: "<p>Discount coupon of 15% (maximum value of IDR 150,000) with a minimum transaction of IDR 50,000 in one booking code.</p>",
    promo_code: "BELI2",
    promo_discount_price: 200000,
    minimum_claim_price: 300000
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromoData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', promoData);
    // Here you would typically send the data to an API

    axios
            .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo`, promoData, {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Travel Promo Form</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input 
            id="title" 
            name="title" 
            value={promoData.title} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea 
            id="description" 
            name="description" 
            value={promoData.description} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input 
            id="imageUrl" 
            name="imageUrl" 
            value={promoData.imageUrl} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="terms_condition" className="block text-gray-700 text-sm font-bold mb-2">
            Terms and Conditions
          </label>
          <textarea 
            id="terms_condition" 
            name="terms_condition" 
            value={promoData.terms_condition} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          />
        </div>
        <div>
          <label htmlFor="promo_code" className="block text-gray-700 text-sm font-bold mb-2">
            Promo Code
          </label>
          <input 
            id="promo_code" 
            name="promo_code" 
            value={promoData.promo_code} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="promo_discount_price" className="block text-gray-700 text-sm font-bold mb-2">
            Promo Discount Price (IDR)
          </label>
          <input 
            id="promo_discount_price" 
            name="promo_discount_price" 
            type="number" 
            value={promoData.promo_discount_price} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="minimum_claim_price" className="block text-gray-700 text-sm font-bold mb-2">
            Minimum Claim Price (IDR)
          </label>
          <input 
            id="minimum_claim_price" 
            name="minimum_claim_price" 
            type="number" 
            value={promoData.minimum_claim_price} 
            onChange={handleInputChange} 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}