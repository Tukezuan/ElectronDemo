#include <node.h>
#include <v8.h>
#include "EllaBookProxy.h"

using namespace v8;
#pragma comment(lib, "EllaBookProxy.lib")


//获取可移动磁盘列表
void GetRemoveableDisk(const v8::FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  
  std::string Str(getRemoveableDisk());
  Local<String> value = String::NewFromUtf8(isolate, Str.c_str());
  args.GetReturnValue().Set(value);
}



void Init(Handle<Object> exports) {
  Isolate* isolate = Isolate::GetCurrent();

  //获取磁盘列表
  exports->Set(String::NewFromUtf8(isolate, "GetRemoveableDisk"),
      FunctionTemplate::New(isolate, GetRemoveableDisk)->GetFunction());
}

NODE_MODULE(EllaAuth, Init)
