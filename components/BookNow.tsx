'use client';

import { useState } from 'react';

const PACKAGE_INCLUDES = [
  'Best value flight advisory',
  'Resort Room (+Pool, Wifi, Hot Water Included)',
  'Airport pickup in Santa Marta, Barranquilla, or Cartagena (extra)',
  'Transportation During Your Week',
  '$100 grocery credit (we can do the shopping for you prior to arrival)',
  'Daily meal delivery',
  'Jungle Tour (+Dirt Bike Rental)',
  'Beach Tour (Rodadero/Taganga)',
  'Tayrona Tour (+Boat, Breakfast, Lunch)',
  'Parque de Los Novios Tour',
  'Medical Tour guide/advisory',
  'Optional Gym Training at Smart Fit',
];

/** Activity options for the interest checklist (labels match user’s list). */
const ACTIVITY_OPTIONS = [
  'Best value flight advisory',
  'Resort Room (+Pool, Wifi, Hot Water Included)',
  'Airport pickup in Santa Marta, Barranquilla, or Cartagena (extra)',
  'Transportation During Your Week',
  '$100 grocery credit (we can do the shopping for you prior to arrival)',
  'Daily meal delivery',
  'Jungle Tour (+Dirt Bik Rental)',
  'Beach Tour (Rodadero/Taganga)',
  'Tayrona Tour (+Boat, Breakfast, Lunch)',
  'Parque de Los Novios Tour',
  'Medical Tour guide/advisory',
  'Optional Gym Training at Smart Fit',
];

/** Additional activities by category (value stored as "Label — Detail"). */
const ADDITIONAL_ACTIVITIES: { category: string; activities: { label: string; detail: string }[] }[] = [
  {
    category: 'Adventures and Excursions',
    activities: [
      { label: 'Sailing in Taganga', detail: 'Dinner Reservation + Sunset Sailing' },
      { label: 'Minca Waterfall Photo Tour', detail: 'Motorcycle or 4X4 Tour + Photoshoot' },
      { label: 'Beach Trip to Tayrona', detail: 'Day Trip + Boat + Lunch + Photo Journey' },
      { label: 'Date Night in The Historic Center', detail: 'Planning + Transportation + Dinner + Activities' },
      { label: 'Real Estate Tour', detail: 'Consult + Planning + Tour' },
      { label: 'Shopping In The Centro', detail: 'Planning + Transportation + Tour' },
    ],
  },
  {
    category: 'Unique Tours',
    activities: [
      { label: 'City Tour', detail: 'Airport Pickup + Setup + City Tour' },
      { label: 'Smart Fit with Pro Trainer', detail: 'Gym Entrance + Training' },
      { label: 'Photo Tour in Parque de Los Novios', detail: 'Walking Tour + Photos' },
      { label: 'Neighborhood Food Crawl', detail: 'Personal Tour + Transportation + Food' },
      { label: 'Learn Spanish', detail: 'Online Spanish Lessons + Onsite Learning Events' },
      { label: 'Motorcycle Street Jam', detail: 'Private Invitation' },
      { label: 'Rodadero Bonfire', detail: 'Event + Drinks' },
      { label: 'Medical Tourism', detail: 'Advisory + Plan + Transportation' },
      { label: 'Social Crash Course', detail: 'Advisory Call + Book + Crash Course' },
    ],
  },
];

const PACKAGE_OPTIONS = [
  { value: '', label: 'Select a package…', price: '', includes: [] as string[], note: '' },
  {
    value: 'single',
    label: 'Single Traveler Lux Resort + Jungle + Beach Tour',
    price: '$2000/week',
    includes: PACKAGE_INCLUDES,
    note: 'Your custom requests!',
  },
  {
    value: 'couple',
    label: 'Couple Resort + Jungle + Beach Tour',
    price: '$2750/week',
    includes: PACKAGE_INCLUDES,
    note: 'Your custom requests!',
  },
  {
    value: 'family',
    label: 'Family/Group Lux Resort + Jungle + Beach Tour',
    price: '$3500/week',
    includes: PACKAGE_INCLUDES,
    note: 'Ideal for 4 member family. Your custom requests!',
  },
];

export default function BookNow() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [packageType, setPackageType] = useState('');
  const [guests, setGuests] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleActivity = (activity: string) => {
    setActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          packageType: packageType || undefined,
          guests: guests ? parseInt(guests, 10) : undefined,
          activities: activities.length ? activities : undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Booking submission failed');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setCheckIn('');
      setCheckOut('');
      setPackageType('');
      setGuests('');
      setActivities([]);
      setNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-santa-teal/10 text-santa-teal mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-santa-teal mb-3">Booking request received</h2>
        <p className="text-santa-teal/80 mb-6">
          Your Santa Marta booking request has been submitted. A PDF confirmation has been sent to joeyhendrickson@me.com and we&apos;ll be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-santa-orange-light text-santa-teal font-semibold rounded-xl hover:bg-santa-sand transition-colors"
        >
          Submit another booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-santa-teal mb-2">Book your Santa Marta trip</h2>
      <p className="text-santa-teal/80 mb-8">
        Fill in your details and we&apos;ll send a booking report and get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="book-name" className="block text-sm font-semibold text-santa-teal mb-2">
            Name *
          </label>
          <input
            id="book-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="book-email" className="block text-sm font-semibold text-santa-teal mb-2">
            Email *
          </label>
          <input
            id="book-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="book-checkin" className="block text-sm font-semibold text-santa-teal mb-2">
              Check-in
            </label>
            <input
              id="book-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal"
            />
          </div>
          <div>
            <label htmlFor="book-checkout" className="block text-sm font-semibold text-santa-teal mb-2">
              Check-out
            </label>
            <input
              id="book-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal"
            />
          </div>
        </div>

        <div>
          <label htmlFor="book-package" className="block text-sm font-semibold text-santa-teal mb-2">
            Package type
          </label>
          <select
            id="book-package"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal"
          >
            {PACKAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value ? `${opt.label} — ${opt.price}` : opt.label}
              </option>
            ))}
          </select>
          {packageType && (() => {
            const pkg = PACKAGE_OPTIONS.find((o) => o.value === packageType);
            if (!pkg?.includes?.length) return null;
            return (
              <div className="mt-4 p-4 rounded-xl bg-santa-orange-light/30 border border-santa-teal/20">
                <p className="font-semibold text-santa-teal mb-1">{pkg.label} — {pkg.price}</p>
                <p className="text-sm font-semibold text-santa-teal/80 mt-3 mb-2">Includes:</p>
                <ul className="text-sm text-santa-teal/90 space-y-1 list-disc list-inside">
                  {pkg.includes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                {pkg.note && (
                  <p className="text-sm text-santa-teal mt-3 font-medium">{pkg.note}</p>
                )}
              </div>
            );
          })()}
        </div>

        <div>
          <label htmlFor="book-guests" className="block text-sm font-semibold text-santa-teal mb-2">
            Number of guests
          </label>
          <input
            id="book-guests"
            type="number"
            min={1}
            max={20}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal"
            placeholder="e.g. 2"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-santa-teal mb-3">
            Select activities you&apos;re interested in
          </p>
          <ul className="space-y-2 p-4 rounded-xl bg-santa-cream border border-santa-teal/20 max-h-64 overflow-y-auto">
            {ACTIVITY_OPTIONS.map((activity, i) => (
              <li key={activity} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`activity-${i}`}
                  checked={activities.includes(activity)}
                  onChange={() => toggleActivity(activity)}
                  className="h-4 w-4 rounded border-santa-teal/40 text-santa-teal focus:ring-santa-teal"
                />
                <label
                  htmlFor={`activity-${i}`}
                  className="text-sm text-santa-teal cursor-pointer select-none"
                >
                  {activity}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-santa-teal mb-3">
            Additional activities
          </p>
          <div className="space-y-6 p-4 rounded-xl bg-santa-cream border border-santa-teal/20 max-h-96 overflow-y-auto">
            {ADDITIONAL_ACTIVITIES.map((group, gi) => (
              <div key={group.category}>
                <p className="text-xs font-bold text-santa-orange uppercase tracking-wider mb-3">
                  {group.category}
                </p>
                <ul className="space-y-2">
                  {group.activities.map((item, ii) => {
                    const value = `${item.label} — ${item.detail}`;
                    const id = `additional-${gi}-${ii}`;
                    return (
                      <li key={value} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={id}
                          checked={activities.includes(value)}
                          onChange={() => toggleActivity(value)}
                          className="h-4 w-4 mt-0.5 rounded border-santa-teal/40 text-santa-teal focus:ring-santa-teal flex-shrink-0"
                        />
                        <label
                          htmlFor={id}
                          className="text-sm text-santa-teal cursor-pointer select-none"
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className="text-santa-teal/80"> — {item.detail}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="book-notes" className="block text-sm font-semibold text-santa-teal mb-2">
            Notes / special requests
          </label>
          <textarea
            id="book-notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field border-santa-teal/30 focus:ring-santa-teal focus:border-santa-teal resize-none"
            placeholder="Activities, dietary needs, accessibility, etc."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-santa-teal text-white font-semibold rounded-xl hover:bg-santa-tealLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          {isSubmitting ? 'Submitting…' : 'Submit booking request'}
        </button>
      </form>
    </div>
  );
}
