// Cheque os arquivos
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

void checkFiles(const fs::path& dir) {
    for (const auto& entry : fs::directory_iterator(dir)) {
        if (entry.is_regular_file()) {
            std::cout << "Arquivo encontrado: " << entry.path() << std::endl;
        }
    }
}
int main() {
    fs::path dir = fs::current_path();
    checkFiles(dir);
    return 0;
}
