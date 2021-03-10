echo "This script is about to run another script."
# exec ${pwd}/test.sh
MYPWD=${PWD}
source $MYPWD/resources/script/test.sh
echo "This script has just run another script."