import React, {useState} from "react";
import {Modal} from "../../../context/Modal"
import SignupForm from "./ModalSignupForm";
import './SignUpModal.css'

function SignupFormModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div className="signup_button" onClick={()=> setShowModal(true)} >
            <button className="signup_link">
                Create new account
            </button>
            </div>
            { showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <SignupForm onClose={()=> setShowModal(false)}/>
                </Modal>
            )

            }
        </div>
    )
}

export default SignupFormModal
