import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

interface NavProps {
  data: {
    title: string;
    link: string;
  }
}

export default function NavButton(props: NavProps) {
  const { data } = props;

  return (
    <Button type="button" className="inline-flex flex-col items-center sm:justify-center sm:items-center justify-center h-full px-5 text-center rounded-none hover:bg-gray-50 group" >
        <a href={data.link} className="flex flex-col items-center">
          {/* <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-dcf-brown group-focus:text-dcf-dark-brown" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {data.svg}  
          </svg> */}
          <span className="text-sm text-gray-500 group-hover:text-dcf-brown group-focus:text-dcf-dark-brown">{data.title}</span>
        </a>
        
    </Button>
  )
}
