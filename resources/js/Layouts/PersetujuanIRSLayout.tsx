import React, { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import PembimbingLayout from './PembimbingLayout';
import TextInput from '@/Components/TextInput';

interface PersetujuanIRSLayoutProps {
  user: any;
  children: ReactNode;
  Back: ReactNode;
}

export default function PersetujuanIRSLayout({ user, children, Back }: PersetujuanIRSLayoutProps) {
  const { auth, url } = usePage().props;

  return (
    <PembimbingLayout user={user}>
      <div className="flex flex-col items-center justify-start w-full min-h-full bg-white z-10 rounded-3xl">
      <div className="flex flex-row items-start justify-between w-full mt-12 bg-white">
        {Back}
        <div className="flex flex-row items-center ml-auto gap-7">
          <TextInput className="w-64 mx-2 mt-5" placeholder="Search" />
          <div className="flex flex-row mr-7 mt-1">
            <div className="flex w-16 h-16 rounded-full bg-black" />
          </div>
        </div>
      </div>

        {/* Content Section */}
        <div className="flex flex-col items-start w-full px-8 mt-5 ml-7">
          {children}
        </div>

      </div>
    </PembimbingLayout>
  );
}
