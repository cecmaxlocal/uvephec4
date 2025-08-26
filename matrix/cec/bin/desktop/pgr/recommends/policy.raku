#!/usr/bin/env raku

use v6;
use strict;


sub recommendPolicy($user) {
    # Lógica para recomendar políticas com base no usuário
    if $user ~~ /admin/ {
        return "Política de Admin";
    }
    return "Política Padrão";
}
sub MAIN(Str $user) {
    my $policy = recommendPolicy($user);
    say "Recomendação de Política para $user: $policy";
}