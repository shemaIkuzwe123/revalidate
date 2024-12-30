"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Github, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center mt-20">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Sign up To Revalidate</CardTitle>
                    <CardDescription>
                      Welcome ! Please create Account to continue
                    </CardDescription>
                  </CardHeader>

                  <CardContent className=" grid gap-y-2">
                    <Clerk.Field name="identifier">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input placeholder="Enter email address" />
                      </Clerk.Input>
                      <Clerk.FieldError className=" block text-sm text-destructive" />
                    </Clerk.Field>
                    <SignUp.Captcha />
                    <div className="grid w-full">
                      <SignUp.Action submit asChild name="continue">
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardContent>
                  <Separator />
                  <span className="flex justify-center items-center font-bold mt-2">
                    Or continue With
                  </span>

                  <CardFooter className="grid grid-cols-2 py-2 gap-x-2">
                    <Clerk.Connection name="github" asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading scope="provider:github">
                          {(isLoading) =>
                            isLoading ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <>
                                <Github className="mr-2 size-4" />
                                GitHub
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                    <Clerk.Connection name="google" asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading scope="provider:google">
                          {(isLoading) =>
                            isLoading ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <>
                                <svg
                                  className="mr-2 h-4 w-4"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fab"
                                  data-icon="google"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 488 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                  ></path>
                                </svg>
                                Google
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                    <Button variant="link" size="sm" asChild>
                      <Link href="/sign-in">
                        Already have an account? Sign in
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </SignUp.Step>
              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Check Your Email</CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                    </CardHeader>
                    <CardContent className=" grid gap-y-4">
                      <Clerk.Field name="code">
                        <Clerk.Label asChild>
                          <Label>Email Verification code</Label>
                        </Clerk.Label>
                        <div className="grid items-center justify-center gap-y-2">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => (
                                <div
                                  data-status={status}
                                  className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-ring"
                                >
                                  {value}
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        <Clerk.FieldError className="block text-center text-sm text-destructive" />
                      </Clerk.Field>

                      <SignUp.Action
                        resend
                        className="text-muted-foreground"
                        fallback={({ resendableAfter }) => (
                          <Button variant="link" size="sm" disabled>
                            Didn&apos;t recieve a code? Resend (
                            <span className="tabular-nums">
                              {resendableAfter}
                            </span>
                            )
                          </Button>
                        )}
                      >
                        <Button variant="link" size="sm">
                          Didn&apos;t recieve a code? Resend
                        </Button>
                      </SignUp.Action>
                    </CardContent>
                    <CardFooter>
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
