import { useState } from "react";

const API =
    "https://raushan-portfolio-uz0b.onrender.com";

export default function Contact({
    notify,
}) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] =
        useState(false);

    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    // ========================================
    // SUBMIT FORM
    // ========================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        // --------------------------------
        // FRONTEND VALIDATION
        // --------------------------------

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.message.trim()
        ) {

            notify(
                "Please fill in all fields.",
                "error"
            );

            return;
        }

        setLoading(true);

        try {

            // --------------------------------
            // SEND TO BACKEND
            // --------------------------------

            const response =
                await fetch(
                    `${API}/api/contact`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            name:
                                form.name.trim(),

                            email:
                                form.email.trim(),

                            message:
                                form.message.trim(),
                        }),
                    }
                );

            const data =
                await response.json();

            // --------------------------------
            // HANDLE ERROR
            // --------------------------------

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Could not send message."
                );
            }

            // --------------------------------
            // SUCCESS
            // --------------------------------

            notify(
                "Message sent successfully! 📧",
                "success"
            );

            // Clear form

            setForm({
                name: "",
                email: "",
                message: "",
            });

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            notify(
                error.message ||
                "Something went wrong.",
                "error"
            );

        } finally {

            setLoading(false);
        }
    };

    // ========================================
    // UI
    // ========================================

    return (
        <main
            className="contact-page section"
        >

            <div
                className="contact-grid"
            >

                {/* ================================= */}
                {/* LEFT SIDE */}
                {/* ================================= */}

                <div
                    className="contact-content"
                >

                    <div className="eyebrow">
                        06
                    </div>

                    <div className="eyebrow">
                        GET IN TOUCH
                    </div>

                    <h1>
                        Have an idea?
                        <br />

                        <span>
                            Let's build it.
                        </span>
                    </h1>

                    <p>
                        I'm open to internships,
                        entry-level software
                        engineering opportunities
                        and interesting projects.
                    </p>

                    <div
                        className="contact-details"
                    >

                        <a
                            href="mailto:rayraushankumar000@gmail.com"
                        >
                            rayraushankumar000@gmail.com ↗
                        </a>

                        <a
                            href="tel:+918757700177"
                        >
                            +91 87577 00177 ↗
                        </a>

                    </div>

                </div>

                {/* ================================= */}
                {/* CONTACT FORM */}
                {/* ================================= */}

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                >

                    {/* NAME */}

                    <label>

                        NAME

                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />

                    </label>

                    {/* EMAIL */}

                    <label>

                        EMAIL

                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            maxLength={150}
                            required
                        />

                    </label>

                    {/* MESSAGE */}

                    <label>

                        MESSAGE

                        <textarea
                            name="message"
                            placeholder="Tell me about your idea..."
                            value={form.message}
                            onChange={handleChange}
                            maxLength={5000}
                            rows="7"
                            required
                        />

                    </label>

                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="button primary"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : "Send message ↗"}

                    </button>

                </form>

            </div>

        </main>
    );
}