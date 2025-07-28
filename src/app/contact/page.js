"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export default function ContactSection() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_13srv4l",
        "template_8x5iore",
        form.current,
        "7DREem4AfBKo-Ee_U"
      )
      .then(
        () => {
          setSent(true);
          setError(null);
          form.current.reset();
          toast.success("Xabar yuborildi!");
        },
        (err) => {
          setError("Xatolik yuz berdi: " + err.text);
          toast.error("Xatolik yuz berdi: " + err.text);
        }
      );
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-8 px-4 py-8 max-w-6xl mx-auto">
      {/* Form qismi */}
      <div className="w-full md:w-1/2 border rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Biz bilan bog&#39;lanish</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Ismingiz"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email manzilingiz"
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Xabaringiz"
            required
            rows="4"
            className="w-full border p-2 rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Yuborish
          </button>
        </form>
      </div>

      {/* Xarita qismi */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Bizning manzil</h2>
        <div className="w-full " style={{ maxWidth: "500px", height: "340px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d438.1298840559702!2d71.77127618894062!3d40.32733436605042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb854baca1ca87%3A0x27350b2e2c0ed92d!2z0LzQuNC90Lgg0LzQsNGA0LrQtdGCINCc0LDQs9C90LjRgg!5e1!3m2!1sru!2s!4v1751957963658!5m2!1sru!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
