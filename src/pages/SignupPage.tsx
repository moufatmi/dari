import React from 'react';
import { SignupForm } from '../components/Auth/SignupForm';
import { Link } from 'react-router-dom';

export function SignupPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Créer un nouveau compte
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Ou{' '}
                    <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
                        connectez-vous à votre compte existant
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <SignupForm />
            </div>
        </div>
    );
}
