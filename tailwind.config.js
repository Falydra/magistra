import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import { table } from 'console';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
		"./node_modules/flowbite/**/*.js"
    ],

    theme: {
    	extend: {
			
    		fontFamily: {
    			sans: ['Poppins']
    		},
    		borderRadius: {
    			custom: '5.0rem',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
			width: {
				'11/12': '93.6666666667%',
			},
    		colors: {
			
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				bg: "#328BC3",
					fg: "#EAF3F9",
					dark: "#1f76a9",
					red: "#E22022",
					light: "#D6E8F3",
					green: "#34AF41"
    			},
    			secondary: {
    				bg: "#FFE8BCCC",
					light: "#D6E8F3",
					txt1: "#1E77AF"
    			},
				button: {
					green: "#34AF41",
					hv_green: "#289232",
					red: "#F54749",
					hv_red: "#E22022",
					yellow: "#C38614",
					hv_yellow: "#AA740F",
					hv_light:"#BFE1F6",
					blue: "#2E689A",
					hv_blue: "#004F87"

				},
				table:{
					head: "#EAF3F9",
				},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	}
    },


    plugins: [forms, require("tailwindcss-animate", "flowite/plugin")],

    plugins: [forms, require("tailwindcss-animate"), require('flowbite/plugin')],

};
