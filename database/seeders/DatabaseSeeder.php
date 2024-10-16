<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Array of users with roles
        $users = [
            [
                'name' => 'Dario Marquardt Sr.',
                'email' => 'mtremblay@example.org',
                'role' => 0, // Student
            ],
            [
                'name' => 'Rossie Bashirian',
                'email' => 'summer57@example.com',
                'role' => 0, // Advisory Lecturer
            ],
            [
                'name' => 'Maribel Kiehn MD',
                'email' => 'dward@example.org',
                'role' => 0, // Head of Department
            ],
            [
                'name' => 'Sabrina Larson',
                'email' => 'roob.joesph@example.net',
                'role' => 0, // Head of Faculty
            ],
            [
                'name' => 'Jennyfer Bauch',
                'email' => 'emmerich.jaylon@example.org',
                'role' => 0, // Academic
            ],
            // Add remaining users here
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'role' => 4, // Admin as Academic for example
            ],
        ];

        // Create users and assign roles
        foreach ($users as $userData) {
            User::factory()->create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'role' => $userData['role'],
                'password' => Hash::make('password'), // Default password, can be customized
            ]);
        }
    }
}
