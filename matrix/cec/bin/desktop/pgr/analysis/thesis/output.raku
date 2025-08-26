#!/usr/bin/env raku

use v6;
use strict;

sub analyzeThesis($thesis) {
    # Lógica para analisar a tese
    if $thesis ~~ /importante/ {
        return "Tese Importante";
    }
    return "Tese Comum";
}

sub outputAnalysis($thesis) {
    my $result = analyzeThesis($thesis);
    say "Resultado da Análise da Tese: $result";
}