// boa sorte para o técnico
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <set>
#include <list>
#include <deque>
#include <algorithm>
#include <numeric>

void processNumbers(const std::vector<int>& numbers) {
    // Calcula a soma dos números
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Soma: " << sum << std::endl;

    // Encontra o valor máximo
    auto maxIt = std::max_element(numbers.begin(), numbers.end());
    if (maxIt != numbers.end()) {
        std::cout << "Máximo: " << *maxIt << std::endl;
    }

    // Encontra o valor mínimo
    auto minIt = std::min_element(numbers.begin(), numbers.end());
    if (minIt != numbers.end()) {
        std::cout << "Mínimo: " << *minIt << std::endl;
    }
}
int main() {
    std::vector<int> numbers = {10, 20, 5, 30, 25};
    processNumbers(numbers);
    return 0;
}   
