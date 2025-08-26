#!//usr/bin/env raku

use v6;
use strict;

sub reinforceSecurity($input) {
    say "Reforçando segurança para: $input";
}

sub MAIN(Str $input) {
    reinforceSecurity($input);
}