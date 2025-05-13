<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Http\Requests\CourseRequest;
use App\Models\Language;

class CourseController extends Controller
{
    public function ShowFormAddCourse(){
        $languages = Language::all(['id as value', 'language as label']);
        return Inertia::render('NewCourseForm',[
                'languages' => $languages,
            ]
        );
    }

    public function Store(CourseRequest $request)
    {
        $data = $request->validated();

        Course::create($data);

        return Redirect::route('dashboard');
    }
}
