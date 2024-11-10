import AuthenticatedLayout from '@/Layouts/ProfileLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ProfileLayout from '@/Layouts/ProfileLayout';

export default function Edit({ mustVerifyEmail, status, auth }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    
    return (
        <ProfileLayout
            user={auth.user}
            header="Profile"

        >
            <Head title="Profile" />

            <div className="flex w-full flex-col">
                <div className="w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8  sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div classN ame="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        </ProfileLayout>
    );
}
