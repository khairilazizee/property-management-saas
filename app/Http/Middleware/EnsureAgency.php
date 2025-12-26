<?php

namespace App\Http\Middleware;

use App\AgencyMemberRole;
use App\Models\AgencyMemberModel;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAgency
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        // check if user is admin in the agency based on role in agency_member table
        $agencyId = optional($request->route('agency'))->id ?? $request->route('agency') ?? $user->agencyMember()->value('agency_id');

        $hasAccess = AgencyMemberModel::where('user_id', $user->id)
            ->where('agency_id', $agencyId)
            ->where('role', AgencyMemberRole::Admin)
            ->exists();

        if (!$hasAccess) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
