import React from 'react';
import { FaTwitter, FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center py-4">
                <div className="flex space-x-6">
                    <a
                        href="#"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 text-sm"
                        title="Twitter"
                    >
                        <FaTwitter className="text-lg"/>
                        <span>Twitter</span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm"
                        title="Facebook"
                    >
                        <FaFacebookF className="text-lg"/>
                        <span>Facebook</span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 text-sm"
                        title="Pinterest"
                    >
                        <FaPinterestP className="text-lg"/>
                        <span>Pinterest</span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 text-sm"
                        title="Instagram"
                    >
                        <FaInstagram className="text-lg"/>
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
