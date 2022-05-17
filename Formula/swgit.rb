# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
# PLEASE REMOVE ALL GENERATED COMMENTS BEFORE SUBMITTING YOUR PULL REQUEST!
class Swgit < Formula
    desc "Easy using git with multiple accounts."
    homepage ""
    url "https://github.com/9bany/git-switch/releases/download/v1.1.0-rc5/swgit-macos"
    sha256 "27573265db43e7f88f47a638976e5112ea266651336fdda8981c3d8a5e48a252"
    license "MIT"
  
    # depends_on "cmake" => :build
  
    def install
      # ENV.deparallelize  # if your formula fails when building in parallel
      # Remove unrecognized options if warned by configure
      # https://rubydoc.brew.sh/Formula.html#std_configure_args-instance_method
      
      # system "cmake", "-S", ".", "-B", "build", *std_cmake_args
      bin.install "swgit-macos" => 'swgit'
    end
  
end