<?php

namespace App;

enum AgencyMemberRole: string
{
    case Staff = 'staff';
    case Agent = 'agent';
    case Admin = 'admin';
}
