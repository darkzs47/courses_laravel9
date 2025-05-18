<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Language;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function Store($courseId, $userId)
    {
        $existingRegistration = Registration::where('course_id', $courseId)
            ->where('user_id', $userId)
            ->exists();

        if ($existingRegistration) {
            return redirect()->route('course.show', $courseId);
        }

        Registration::create([
            'course_id' => $courseId,
            'user_id' => $userId,
        ]);

        return Inertia::location(route('dashboard'));
    }

    public function ShowUserRegistrations($userId)
    {
        $languages = Language::all();

        $registrations = Registration::where('user_id', $userId)
            ->with('course')
            ->get();


        return Inertia::render('Registrations', [
            'registrations' => $registrations,
            'languages' => $languages,
        ]);
    }

    public function Cancel($id)
    {
        $registration = Registration::findOrFail($id);
        $registration->delete();

        return redirect()->back();
    }

    public function ShowAllRegistrations()
    {
        $registrationsCount = Registration::with(['course', 'user'])
            ->get()
            ->groupBy('course_id')
            ->map(function ($registrationsGroup) {
                return [
                    'registrationsCount' => $registrationsGroup->count(),
                ];
            });

        $registrations = Registration::with(['course', 'user'])->get();
        $languages = Language::all();

        return Inertia::render('AllRegistrations', [
            'registrations' => $registrations,
            'languages' => $languages,
            'registrationsCount' => $registrationsCount,
        ]);
    }

    public function delete($id)
    {
        $registration = Registration::findOrFail($id);

        $registration->delete();

        return redirect()->route('dashboard');
    }
}
