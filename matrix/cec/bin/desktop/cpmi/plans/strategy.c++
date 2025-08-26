// Esta é uma estratégia para o projeto
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <numeric>
#include <map>
#include <set>
#include <list>
#include <deque>

using namespace std;

void executeStrategy(const vector<string>& data) {
    // Implementar a lógica da estratégia aqui
    for (const auto& item : data) {
        cout << "Processando: " << item << endl;
    }
}
int main() {
    vector<string> data = {"item1", "item2", "item3"};
    executeStrategy(data);
    return 0;
}