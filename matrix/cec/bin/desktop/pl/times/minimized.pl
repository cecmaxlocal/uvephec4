#!/usr/bin/env perl

use strict;
use warnings;

sub minimize_time {
    my ($time) = @_;
    $time =~ s/\s+//g;  # Remove espaço em branco
    return $time;
}

sub MAIN {
    my $input_time = shift;
    my $minimized_time = minimize_time($input_time);
    print "Minimizedo tempo: $minimized_time\n";
}
