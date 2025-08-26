// Encontrar os valores máximos
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<int> values = {10, 20, 5, 30, 25};
    int maxValue = *max_element(values.begin(), values.end());
    cout << "O valor máximo é: " << maxValue << endl;
    return 0;
}
