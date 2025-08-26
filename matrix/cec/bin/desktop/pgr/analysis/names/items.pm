#!/usr/bin/env perl

use strict;
use warnings;

sub items {
    my ($input) = @_;
    print "You entered: $input\n";
}

sub list {
    my ($input) = @_;
    items($input);
}

sub names {
    my ($input) = @_;
    print "voce entrou: $input\n";
}