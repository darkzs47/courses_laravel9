<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Http\Requests\CourseRequest;
use App\Models\Language;

class CourseController extends Controller
{
    public function ShowFormAddCourse()
    {
        $languages = Language::all();
        return Inertia::render('NewCourseForm', [
                'languages' => $languages,
            ]
        );
    }

    public function ShowAdmin()
    {
        $courses = Course::withCount('registrations')->get();
        $languages = Language::all();
        return Inertia::render('Dashboard',[
                'languages' => $languages,
                'courses' => $courses,
            ]);
    }

    public function ShowCoursesByLanguage($id)
    {
        $coursesByLanguage = Course::where('language_id', $id)->get();
        $currentLanguage = Language::where('id', $id)->first();
        $languages = Language::all();

        return Inertia::render('CoursesByLanguage', [
            'coursesByLanguage' => $coursesByLanguage,
            'languages' => $languages,
            'currentLanguage' => $currentLanguage,
        ]);
    }

    public function ShowCourse($id)
    {
        $course = Course::where('id', $id)->first();
        $registrationsCount = Registration::where('course_id', $id)->count();
        $languages = Language::all();
        return Inertia::render('CourseFullInfo', [
            'course' => $course,
            'languages' => $languages,
            'registrationsCount' => $registrationsCount,
        ]);
    }

    public function Store(CourseRequest $request)
    {
        $data = $request->validated();

        $course = Course::create($data);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image = $request->file('image');

            $imageName = time() . '.' . $image->getClientOriginalExtension();

            $image->move(public_path('images'), $imageName);

            $course->image = $imageName;
            $course->save();
        }

        return redirect()->route('dashboard')->with('message', 'CourseAddSuccessfully');
    }

    public function Destroy($id)
    {
        $course = Course::findOrFail($id);

        $registrationsCount = Registration::where('course_id', $course->id)->count();

        if ($registrationsCount > 0) {
            return redirect()->route('dashboard')->with('message', 'CourseDeleteError');
        }

        $course->delete();

        return redirect()->route('dashboard')->with('message', 'CourseDeleteSuccessfully');
    }
}
