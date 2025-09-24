/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/pages/SellCarForm.tsx
'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { CarListing } from '@/types/auction';

const SellCarForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<CarListing>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: '',
    condition: '',
    startingBid: 0,
    reservePrice: 0,
    auctionDuration: 7,
    description: '',
    features: [],
    images: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (field: keyof CarListing, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveDraft = () => {
    console.log('Saving draft:', formData);
    // Handle draft saving
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">List Your Car for Auction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                <select 
                  value={formData.make}
                  onChange={(e) => handleInputChange('make', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Make</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="audi">Audi</option>
                  <option value="lexus">Lexus</option>
                  <option value="nissan">Nissan</option>
                  <option value="mazda">Mazda</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="ford">Ford</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., Camry, Civic, 320i"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select 
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                <input
                  type="text"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', e.target.value)}
                  placeholder="e.g., 45,000"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select 
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="excellent">Excellent - Like new condition</option>
                  <option value="very-good">Very Good - Minor wear, well maintained</option>
                  <option value="good">Good - Some wear, runs well</option>
                  <option value="fair">Fair - Significant wear, needs some work</option>
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                'Leather Seats', 'Sunroof', 'Navigation', 'Backup Camera', 
                'Heated Seats', 'Bluetooth', 'Cruise Control', 'Keyless Entry',
                'Premium Audio', 'Alloy Wheels', 'Tinted Windows', 'Remote Start'
              ].map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.features?.includes(feature)}
                    onChange={(e) => {
                      const currentFeatures = formData.features || [];
                      if (e.target.checked) {
                        handleInputChange('features', [...currentFeatures, feature]);
                      } else {
                        handleInputChange('features', currentFeatures.filter(f => f !== feature));
                      }
                    }}
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your vehicle's condition, maintenance history, and any notable features. Be honest and detailed to attract serious buyers."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Include information about service records, any accidents, modifications, etc.
            </p>
          </div>

          {/* Photos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop photos here, or click to select</p>
              <p className="text-sm text-gray-500 mb-4">Upload up to 20 photos (JPG, PNG, max 10MB each)</p>
              <p className="text-xs text-gray-400 mb-4">
                Include exterior from all angles, interior, engine bay, and any damage or wear
              </p>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                id="photo-upload"
                onChange={(e) => {
                  if (e.target.files) {
                    handleInputChange('images', Array.from(e.target.files));
                  }
                }}
              />
              <label htmlFor="photo-upload">
                <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
                  Select Photos
                </span>
              </label>
            </div>
            {formData.images && formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  {formData.images.length} photo{formData.images.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>

          {/* Auction Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Auction Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Bid ($)
                </label>
                <input
                  type="number"
                  value={formData.startingBid}
                  onChange={(e) => handleInputChange('startingBid', parseInt(e.target.value))}
                  placeholder="5000"
                  min="100"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum starting bid: $100</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reserve Price ($)
                </label>
                <input
                  type="number"
                  value={formData.reservePrice}
                  onChange={(e) => handleInputChange('reservePrice', parseInt(e.target.value))}
                  placeholder="8000"
                  min="0"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum price you&apos;ll accept</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction Duration
                </label>
                <select 
                  value={formData.auctionDuration}
                  onChange={(e) => handleInputChange('auctionDuration', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={3}>3 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={7}>7 Days (Recommended)</option>
                  <option value={10}>10 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fees Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Fee Structure</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Listing Fee:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Success Fee (only if sold):</span>
                <span className="font-medium">5% of final sale price</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Processing:</span>
                <span className="font-medium">3% of final sale price</span>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={saveDraft}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellCarForm;