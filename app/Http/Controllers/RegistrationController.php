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

    public function ShowUserRegistrations()
    {
        $id = auth()->id();

        $languages = Language::all();

        $registrations = Registration::where('user_id', $id)
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

    public function ShowAllRegistrations($id = null)
    {
        $languages = Language::all();

        $query = Registration::with(['course', 'user']);

        if ($id) {
            $query->where('course_id', $id);
        }

        $registrations = $query->get();

        $registrationsCount = Registration::select('course_id')
            ->selectRaw('COUNT(*) as registrationsCount')
            ->groupBy('course_id')
            ->pluck('registrationsCount', 'course_id');

        return Inertia::render('AllRegistrations', [
            'registrations' => $registrations,
            'languages' => $languages,
            'registrationsCount' => $registrationsCount,
        ]);
    }

    public function Delete($id)
    {
        $registration = Registration::findOrFail($id);

        $registration->delete();

        return redirect()->route('dashboard');
    }
}
