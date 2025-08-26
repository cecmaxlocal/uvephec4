#!/usr/bin/env perl

use strict;
use warnings;

sub test_main {
    my $input = "teste";
    my $expected = "voce entrou: teste";
    my $output = `./phec4.raku $input`;
    chomp $output;
    is($output, $expected, "Testando entrada: $input");
}
