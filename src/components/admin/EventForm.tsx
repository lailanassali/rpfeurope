"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/components/common/FormInput';
import { FormSelect } from '@/components/common/FormSelect';
import { FormTextarea } from '@/components/common/FormTextarea';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { RPFButton } from '@/components/common/RPFButton';
import { DynamicStringList } from '@/components/admin/DynamicStringList';
import { FAQInputList } from '@/components/admin/FAQInputList';
import { WhatToExpectInputList } from '@/components/admin/WhatToExpectInputList';

interface EventFormData {
  title: string;
  slug: string;
  image_url: string;
  location: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: string;
  badge_text: string;
  badge_color: string;
  quote: string;
  key_highlights: string[];
  what_to_expect: { title: string; description: string; image: string }[];
  faqs: { question: string; answer: string }[];
}

interface EventFormProps {
  initialData?: Partial<EventFormData>;
  eventId?: string;
}

export function EventForm({ initialData, eventId }: EventFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    image_url: initialData?.image_url || '',
    location: initialData?.location || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    venue: initialData?.venue || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    badge_text: initialData?.badge_text || '',
    badge_color: initialData?.badge_color || '',
    quote: initialData?.quote || '',
    key_highlights: initialData?.key_highlights || [],
    what_to_expect: initialData?.what_to_expect || [],
    faqs: initialData?.faqs || [],
  });

  const handleChange = (field: keyof EventFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = eventId ? `/api/admin/events/${eventId}` : '/api/admin/events';
      const method = eventId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      toast.success(`Event ${eventId ? 'updated' : 'created'} successfully`);
      router.push('/admin/events');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Details</h3>

        <div className="space-y-4">
          <FormInput
            label="Event Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />

          <FormInput
            label="Slug (URL-friendly name)"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            required
            placeholder="auto-generated-from-title"
          />

          <ImageUpload
            label="Event Image"
            value={formData.image_url}
            onChange={(url) => handleChange('image_url', url)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
            />

            <FormSelect
              label="Category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              options={[
                { value: '', label: 'Select Category' },
                { value: 'RPF Europe', label: 'RPF Europe' },
                { value: 'Youth', label: 'Youth' },
                { value: 'Children', label: 'Children' },
                { value: 'Men', label: 'Men' },
                { value: 'Women', label: 'Women' },
                { value: 'Campus', label: 'Campus' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              required
            />

            <FormInput
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              required
            />
          </div>

          <FormInput
            label="Venue"
            value={formData.venue}
            onChange={(e) => handleChange('venue', e.target.value)}
            required
            placeholder="e.g., Main Auditorium, London"
          />

          <FormTextarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
          />

          <FormTextarea
            label="Quote"
            value={formData.quote}
            onChange={(e) => handleChange('quote', e.target.value)}
            rows={3}
            placeholder="Inspiring quote for the event..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Badge Text (Optional)"
              value={formData.badge_text}
              onChange={(e) => handleChange('badge_text', e.target.value)}
              placeholder="e.g., Featured, Upcoming"
            />

            <FormInput
              label="Badge Color (Optional)"
              type="color"
              value={formData.badge_color}
              onChange={(e) => handleChange('badge_color', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>

        <DynamicStringList
          label="Key Highlights"
          items={formData.key_highlights}
          onChange={(items) => handleChange('key_highlights', items)}
          placeholder="Add a highlight..."
        />

        <div className="border-t border-gray-100 pt-6"></div>

        <WhatToExpectInputList
          label="What to Expect"
          items={formData.what_to_expect}
          onChange={(items) => handleChange('what_to_expect', items)}
        />

        <div className="border-t border-gray-100 pt-6"></div>

        <FAQInputList
          label="Frequently Asked Questions (FAQs)"
          items={formData.faqs}
          onChange={(items) => handleChange('faqs', items)}
        />
      </div>

      <div className="flex items-center gap-4 justify-end">
        <RPFButton
          type="button"
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 h-auto"
          disabled={isLoading}
        >
          Cancel
        </RPFButton>
        <RPFButton
          type="submit"
          className="bg-primary text-white hover:bg-primary/90 px-6 py-2 h-auto"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : eventId ? 'Update Event' : 'Create Event'}
        </RPFButton>
      </div>
    </form>
  );
}
