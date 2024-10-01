import { Link, Head, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function Welcome({status, canResetPassword}: {status?: string, canResetPassword: boolean}) {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('welcome'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGetStartedClick = () => {
        setShowLoginForm(true);
    };



    return (
        <Layout >
            <Head title="Login - Magistra" />
            <div className="relative h-screen overflow-y-hidden">
                {/* Background image */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/clean-empty-library-hall.png')" }}></div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-300 opacity-60 to-transparent"></div>
                
                {/* Content */}
                <div className="relative flex justify-center items-center h-full flex-col">
                    <div className="flex w-6/12 h-4/6 bg-white rounded-2xl flex-row">
                        <div className='flex w-4/6 justify-center items-center flex-col'>
                            {!showLoginForm && (
                                <div className='flex flex-col items-center'>
                                    <img className='w-auto h-auto' src='/images/image 2 (1) 3.png' />
                                    <h1 className='text-3xl font-bold text-center'>
                                        Magistra Academy
                                    </h1>
                                    <div onClick={handleGetStartedClick} className='flex w-[150px] h-[50px] bg-yellow-500 rounded-xl mt-8 items-center justify-center text-md font-bold cursor-pointer'>
                                        Login SSO
                                    </div>
                                </div>
                            )}
                            {showLoginForm && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='flex w-full h-full flex-col items-center justify-center'
                                >
                                    
                                        <h1 className='text-2xl font-bold'>
                                            Login
                                        </h1>
                                        <form onSubmit={submit} className='w-full px-12'>

                                        <div>

                                            <InputLabel htmlFor="email" value="Email" />

                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    isFocused={true}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel htmlFor="password" value="Password" />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div className="block mt-4">
                                            <label className="flex items-center">
                                                <Checkbox
                                                    name="remember"
                                                    checked={data.remember}
                                                    onChange={(e) => setData('remember', e.target.checked)}
                                                />
                                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-end mt-4">
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}

                                            <PrimaryButton className="ms-4" disabled={processing}>
                                                Log in
                                            </PrimaryButton>
                                        </div>
                                        </form>
                                        
                                    
                                </motion.div>
                            )}
                        </div>
                        
                        <div className='flex w-5/12 items-center flex-col rounded-l-custom text-start z-11' style={{ backgroundColor: '#2E689A' }}>
                            <h2 className='text-2xl mt-4'>
                                Welcome To
                            </h2>
                            <h1 className='text-4xl font-bold text-yellow-500'>
                                MAGISTRA
                            </h1>
                            <img className='w-auto h-96 mt-3.5 ' src='/images/image-young-ceo-manager-korean-working-woman-holding-tablet-smiling-standing-white-background-removebg-preview 1.png' />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}