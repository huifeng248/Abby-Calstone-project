import React, {useState} from "react";
import {Modal} from "../../../context/Modal"
import SignupForm from "./ModalSignupForm";
import './SignUpModal.css'

function SignupFormModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="signup_button" onClick={()=> setShowModal(true)} onClose={()=> setShowModal(false)}>
            <button className="signup_link">
                Create new account
            </button>
            { showModal && (
                <Modal showModal={showModal} setShowModal={setShowModal} onClose={()=> setShowModal(false)}>
                    <SignupForm showModal={showModal} setShowModal={setShowModal} onClose={()=> setShowModal(false)}/>
                </Modal>
            )

            }
        </div>
    )
}

export default SignupFormModal
