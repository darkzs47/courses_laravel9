<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RegistrationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [CourseController::class, 'ShowAdmin'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/add/course', [CourseController::class, 'ShowFormAddCourse'])->name('add.course');
Route::post('/add/course', [CourseController::class, 'Store'])->name('courses.store');

Route::get('/courses/language/{id}', [CourseController::class, 'ShowCoursesByLanguage'])->name('courses.byLanguage');
Route::get('/course/{id}', [CourseController::class, 'ShowCourse'])->name('course.show');

Route::post('/courses/{courseId}/register/{userId}', [RegistrationController::class, 'Store'])
    ->name('courses.register');

Route::get('/user/registrations', [RegistrationController::class, 'ShowUserRegistrations'])
    ->name('user.registrations');

Route::get('/registrations/{id?}', [RegistrationController::class, 'ShowAllRegistrations'])->name('admin.registrations');

Route::delete('/registrations/{id}/cancel', [RegistrationController::class, 'Cancel'])
    ->name('registration.cancel');
Route::delete('/registrations/{id}/delete', [RegistrationController::class, 'Delete'])
    ->name('registration.delete');

Route::delete('/course/{id}', [CourseController::class, 'Destroy'])->name('course.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
