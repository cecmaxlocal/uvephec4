#!/usr/bin/env perl

use strict;
use warnings;

sub normalize_state {
    my ($state) = @_;
    $state =~ s/\s+//g;  # Remove espaço em branco
    return $state;
}

sub MAIN {
    my $input_state = shift;
    my $normalized_state = normalize_state($input_state);
    print "Estado normalizado: $normalized_state\n";
}
