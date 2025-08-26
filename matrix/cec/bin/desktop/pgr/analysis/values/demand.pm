#!/usr/bin/env perl

use strict;
use warnings;

sub demand {
    my ($input) = @_;
    print "You entered: $input\n";
}

sub list {
    my ($input) = @_;
    demand($input);
}

sub names {
    my ($input) = @_;
    print "voce entrando: $input\n";
}
