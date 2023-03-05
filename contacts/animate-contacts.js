function animateDetail() {
    gsap.from("#contact_right", {
        x: 150,
        opacity: 0,
        duration: 0.33,
        ease: "back.out(0.7)",
    });
}

function animateAddContact() {
    gsap.from("#add_contact_container", {
        width: 1200,
        x: -1000,
        duration: 0.55,
        ease: "back.out(0.35)",
    });
}

function animateEditContact() {
    gsap.from(".edit-contact-inner-container", {
        x: -400,
        duration: 0.55,
        ease: "back.out(0.35)",
    });
}